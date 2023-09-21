import axios from "axios";

export const AboneGDSService = {
    getParametreler() {
        return axios.get('/demo/data/parametreler.json').then((res) => res.data.data).catch((e) => console.log(e));
    }
};