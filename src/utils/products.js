import * as axios from 'axios';

export const fetchProducts = async () => {
    try {
        const response = await axios.get('/api/products.json');
        const data = parseList(response);
        return data;
    } catch (error) {
        console.error('error', error)
        return [];
    }
}

const parseList = response => {
    if (response.status !== 200) throw Error(response.message);
    if (!response.data) return [];
    let list = response.data;
    if (typeof list !== 'object') {
      list = [];
    }
    return list;
  };
  

export default {
    fetchProducts
}