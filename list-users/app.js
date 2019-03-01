var AWS = require('aws-sdk')
//AWS.config.update({region: process.env.AWS_REGION});

const userPoolId = process.env.USERPOOLID
var cogProvider = new AWS.CognitoIdentityServiceProvider()

let response = undefined

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        let usersResp = await cogProvider.listUsers({
            UserPoolId: userPoolId,
            AttributesToGet: [
                'email'
            ]
        }).promise()

        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: `No. of users: ${usersResp && usersResp.Users && usersResp.Users.length || 0}`
                //cognitoResponse: usersResp
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err)
        return err
    }

    return response
};

