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
      params: ['update', state],
    });
  }

  if (!state1) {
    state1 = {book:[]}; 
    // initialize state1 if empty and set default data
    await wallet.request({
      method: 'snap_manageState',
      params: ['update', state],
    });
  }

  switch (request.method) {
    case 'storePassword': 
      state.book.push({
        name:request.params.nameToStore,
        Password:request.params.PasswordToStore
      });
      await wallet.request({
        method: 'snap_manageState', 
        params: ['update', state], 
      }); 
      
      return true; 
    case 'storetext':
      state.textcontent.push({
        textToSend:request.params.textToSend,
      });
      await wallet.request({
        method: 'snap_manageState', 
        params: ['update', state], 
      }); 
    case 'retrievePassword': 
      return state.book; 
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
        let text_book = state2.textcontent.map(function(item){
            return `${item}`; 
          }).join("\n"); 
        return wallet.request({
          method: 'snap_confirm',
          params: [
            {
              prompt: `Hello, ${origin}!`,
              description: 'all text stored:',
              textAreaContent: text_book,
            },
          ],
        });
      
    default:
      throw new Error('Method not found.');
  }
};
