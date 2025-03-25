import { ref } from "vue"

export const App = () => {
  var project = ref(
    {
      projectBy: "Krkit",
      version: "v0.1.3",
      // LOCAL //

     apiUrl: 'https://localhost:7213/api',
   // uploads: 'https://localhost:7213/',
      // LOCAL //

      // TEST //
     //apiUrl: 'https://api.tarasat.com/api',
   // uploads: 'https://testapi.sitrancelik.com/',
      // TEST //

      // LIVE //

    // apiUrl: 'https://test.sitrancelik.com/api',
    // uploads: 'https://test.sitrancelik.com/',
      // LIVE //
    }
  )

  return {
    project
  }
}




