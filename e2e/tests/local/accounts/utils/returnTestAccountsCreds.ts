import  * as fs  from 'fs';

export default async function returnTestsAccountsCreds() {
    let data = fs.readFileSync('credentials.json');
    let creds = await JSON.parse(data.toString())
    return creds
      
}