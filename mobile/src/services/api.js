import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.3.2:3333'
  // no celular, pode ser usar o IP da sua máquina/rede wifi
  // no Genymotion, http://10.0.3.2:3333
  // no AndroidStudio, http://10.0.2.2:3333
  /*
    redicionamento de porta
    quando acessar porta x, indicar para porta y (da MV)
    com adb reverse tcp:3333 tcp:3333 
  */ 
});

export default api;