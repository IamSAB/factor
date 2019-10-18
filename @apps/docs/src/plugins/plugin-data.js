import Factor from "vue"
import { plugins } from "../extensions"

import axios from "axios"
export default () => {
  return new (class {
    constructor() {}

    async getReadme() {
      console.log("START QU")
      const _promises = plugins.map(async plugin => {
        const _queries = [
          axios.get(`https://cors-anywhere.herokuapp.com/registry.npmjs.org/${plugin}`),
          axios.get(
            "https://cors-anywhere.herokuapp.com/https://api.npms.io/v2/search?q=keywords%3Afactor-plugin"
          )
        ]

        // plugin package name
        //console.log(plugin)

        //Get npm downloads from last month
        const downloads = axios
          .get(
            `https://cors-anywhere.herokuapp.com/https://api.npmjs.org/downloads/point/last-month/${plugin}`
          )
          .then(d => console.log("DOWNLOAAAADS", d))

        const [{ data }, index] = await Promise.all(_queries)

        return { ...data, index }
      })

      const pluginsData = await Promise.all(_promises)

      console.log("DATAAAA", pluginsData)
    }
  })()
}

// getNpmDownloadsLastMonth: function (name) {
//   return $http.get('https://api.npmjs.org/downloads/point/last-month/' + name).success(function (resp) {
//       return resp;
//   });
// },

// getNpmDownloadsRangeLastMonth: function (name) {
//   return $http.get('https://api.npmjs.org/downloads/range/last-month/' + name).success(function (resp) {
//       return resp;
//   });
// },
