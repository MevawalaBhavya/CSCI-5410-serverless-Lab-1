const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const { fileId, htmlContentType } = event;

  console.log("FileID : ", fileId);

  try {
    
    // Configuration for storing HTML content in S3
    const s3Input = {
      Bucket: "serverless-lab-1-bucket-1",
      Key: `${fileId}.html`,
      Body: htmlContentType,
      ContentType: "text/html", 
    };

    // Store HTML content in S3
    await s3.putObject(s3Input).promise();
    
    // Return success response
    return {
      statusCode: 200,
      message: "File saved !!",
      headers: {
        "Access-Control-Allow-Origin": "*", // Adjust as needed for your use case
        "Content-Type": "application/json"
    },
    };
  } catch (error) {
    console.error("Error in saving file: ", error);
    return {
      statusCode: 500,
      error: "Error in saving the file",
    };
  }
};
