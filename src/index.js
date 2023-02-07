module.exports.onRpcRequest = async ({ origin, request }) => {

  let state = await wallet.request({
    method: 'snap_manageState',
    params: ['get'],
  });

  if (!state) {
    state = {book:[]}; 
    // initialize state if empty and set default data
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
    case 'retrievePassword': 
      return state.book; 
    case 'hello':
      let Password_book = state.book.map(function(item){
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
    default:
      throw new Error('Method not found.');
  }
};
