### How to structure your file

You can submit data as a CSV file or JSON file from a blood glucose monitor (BGM), a continuous glucose monitor (CGM), or manually recorded results. The values of the blood sugar can be in either mmol/L or mg/dl.

Some files from blood sugar monitoring devices and platforms will work automatically with Sensing Sugar. Others might require some minor modifications.

In general, a CSV file should have at least one column named **glucose**, and must have the file extension **'.csv'**. I’ve created a [Guide](https://docs.google.com/document/d/1VE5JmlrB2MPTYNuiO1rN6_idoGAQMh44Cqja982c6d8/edit?usp=sharing) that provides much more information on using CSV files from diabetic management platforms.

A JSON file should be an array of objects containing the property **glucose**, and must have the file extension **'.json'**.
