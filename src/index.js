module.exports.onRpcRequest = async ({ origin, request }) => {

  let state1 = await wallet.request({
    method: 'snap_manageState',
    params: ['get'],
  });

  let state2 = await wallet.request({
    method: 'snap_manageState',
    params: ['get'],
  });

  if (!state1) {
    state2 = {textcontent:[]}; 
    // initialize state1 if empty and set default data
    await wallet.request({
      method: 'snap_manageState',
      params: ['update', state2],
    });
  }

  if (!state1) {
    state1 = {book:[]}; 
    // initialize state1 if empty and set default data
    await wallet.request({
      method: 'snap_manageState',
      params: ['update', state1],
    });
  }

  switch (request.method) {
    case 'storePassword': 
      state1.book.push({
        name:request.params.nameToStore,
        Password:request.params.PasswordToStore
      });
      await wallet.request({
        method: 'snap_manageState', 
        params: ['update', state1], 
      }); 
      
      return true; 
    case 'storetext':
      state2.textcontent.push({
        textToSend:request.params.textToSend,
      });
      await wallet.request({
        method: 'snap_manageState', 
        params: ['update', state2], 
      }); 
      return true; 
    case 'retrievePassword': 
      return state1.book; 
    case 'hello':
      let Password_book = state1.book.map(function(item){
          return `${item.name}: ${item.Password}`; 
        }).join("\n"); 
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Hello, ${origin}!`,
            description: 'Password book:',
            textAreaContent: Password_book,
          },
        ],
      });
      case 'hellochat':
        // let text_book = state2.textcontent.map(function(item){
        //     return `${item}`; 
        //   }).join("\n"); 
        return wallet.request({
          method: 'snap_confirm',
          params: [
            {
              prompt: `Hello, ${origin}!`,
              description: 'all text stored:',
              textAreaContent: state2,
            },
          ],
        });
      
    default:
      throw new Error('Method not found.');
  }
};
