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

async function scanForResultsDdbDc1(wall_list_id){
    try {
        var params = {
            TableName: process.env.API_MILLANIALPINK_WALLPAPERTABLE_NAME,
            FilterExpression: "#walllistID = :walllistID",
            ExpressionAttributeNames: {
                "#walllistID": "walllistID"
            },
            ExpressionAttributeValues: { 
                ":walllistID": wall_list_id // UUID id from the database 
            }
        };
        var result = await ddbDocumentClient.scan(params).promise();
        return(result)
    } catch (error) {
        console.error(error);
    }
}
async function scanForResultsDdbDc2(){
    try {
         var params = {
            TableName:  process.env.API_MILLANIALPINK_WALLLISTTABLE_NAME
        };
        var result = await ddbDocumentClient.scan(params).promise()
        return(result)
    } catch (error) {
        console.error(error);
    }
}
exports.handler = async (event) => {
   
    const wallist = await scanForResultsDdbDc2();
    const { Items }  = wallist;
    //console.log(Items.length);
    const result = Items.map(async x=> 
    {
        let i = await scanForResultsDdbDc1(x.id);
        return { ...x , wallpapers: i['Items'] }
    }); 
    const results = await Promise.all(result);
    return {
        body: 
            JSON.stringify({Items: results})
    }
};
