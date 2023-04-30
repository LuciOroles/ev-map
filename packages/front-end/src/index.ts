 
import { GraphQLClient, gql } from 'graphql-request'

async function run() {

  const query = gql`
  {
    companies {
      id
     name
     parent {id}
    }
  }
`

 
try {
  const graphQLClient = new GraphQLClient('http://localhost:8000/graphql', {
    mode: 'cors',
    
  });
  const data = await graphQLClient.request(query)
  console.log(data, ' data')
} catch (error) {

  console.error(error)
}
}

  document.addEventListener("DOMContentLoaded", ()=> {
    const comp =  document.getElementById('getCompanies');
    fetch('http://localhost:8000/test')
    comp.addEventListener('click', run);
  });
