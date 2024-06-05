const AWS = require("aws-sdk");

const awsS3 = new AWS.S3();
const awsDynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  
  const { fileId } = event;

  console.log("Delete File : ", fileId);

  const s3Input = {
    Bucket: "serverless-lab-1-bucket-1",
    Key: `${fileId}.html`
  };

  // Delete file from S3
  await awsS3.deleteObject(s3Input).promise();

  // Delete file from DynamoDB
  const dbParams = {
    TableName: "serverless-lab-1-db-1",
    Key : { fileId: fileId },
  };
  await awsDynamoDB.delete(dbParams).promise();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Adjust as needed for your use case
      "Content-Type": "application/json"
  },
  body: JSON.stringify({ message: 'Note deleted successfully' })
  };
};