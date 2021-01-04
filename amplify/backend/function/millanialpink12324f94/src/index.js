/* Amplify Params - DO NOT EDIT
	API_MILLANIALPINK_GRAPHQLAPIIDOUTPUT
	API_MILLANIALPINK_WALLLISTTABLE_ARN
	API_MILLANIALPINK_WALLLISTTABLE_NAME
	API_MILLANIALPINK_WALLPAPERTABLE_ARN
	API_MILLANIALPINK_WALLPAPERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-2'});
var ddbDocumentClient = new AWS.DynamoDB.DocumentClient();

async function scanForResultsDdbDc1(){
    try {
        var params = {
            TableName: process.env.API_MILLANIALPINK_WALLPAPERTABLE_NAME
        };
        var result = await ddbDocumentClient.scan(params).promise()
        return(result)
    } catch (error) {
        console.error(error);
    }
}
async function scanForResultsDdbDc2(){
    try {
         var params = {
            TableName: process.env.API_MILLANIALPINK_WALLLISTTABLE_NAME
        };
        var result = await ddbDocumentClient.scan(params).promise()
        return(result)
    } catch (error) {
        console.error(error);
    }
}
exports.handler = async (event) => {
    const wallpapers = await scanForResultsDdbDc1();
    const wallist = await scanForResultsDdbDc2();
    console.log(wallpapers, wallist);
    return {
        body: JSON.stringify({
            wallpapers: wallpapers.Items,
            wallist: wallist.Items
        })
    }
};
