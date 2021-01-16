# Stock Analyzer backend application
A node js REST API application to fetch & analyze stocks data with user authentication.

## Endpoints
Returns a response based on endpoint:
1) `/users` - Create user, get user list, search for user by parameters. (jwt protected)
2) `/stocks` - Add new stock, search for stock by parameters
3) `/stockRecord` - Get all stocks records.

To be added: 
- get records by stock\date range.
- analyze selected stock for X amount of years back.
- integration with https://iexcloud.io/ 

## Dependencies
1) `express` - Minimal and flexible Node framework that provides a robust set of features for web applications. https://expressjs.com/
2) `mongoose` - Mongoose provides a straight-forward, schema-based solution to model application data. https://mongoosejs.com/
3) `jsonwebtoken` - jwt library to create and verify jwt tokens.  https://github.com/auth0/node-jsonwebtoken
4) `bcryptjs` - encrypt\decrypt password library using hashing with salt.  https://www.npmjs.com/package/bcryptjs
5) `.env` - organizes hierarchical configurations for app deployments. https://www.npmjs.com/package/config
