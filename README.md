This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


Form builder built using:
- React
- Mongoose database
- Node js

## What does it do?

One can add any number of questions in the form-builder. Questions are of type Radio, Checkboxes, Paragraph. I'll add more later on.

After the submission of the form, a public link will generated and that link can be shared with anyone.

After clicking on the link, one will redirected to the Response Page UI; where questions will be asked in progressive(one by one) order.

Once all the questions are asked, responses will be saved along with the questions.

### Prerequisites to run the app

- install npm and node js.
- install [mongodb](https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu-16.04/).

### Steps to use this repo

- clone the repo
```sh
cd form-builder
npm install
npm start run
``` 
- You should see question-builder running on [http://localhost:3000](http://localhost:3000)
 
