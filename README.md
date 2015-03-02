 # assign_04
 
 1.Source.json file is provided that contains student information.
 2.Create a HTTP server where a client can submit a HTTP GET request with
   the URL: /students/?q=Jan.
 3.The query string "q" is an optional query parameter in your URL.
 4.If "q" is not specified in the request then return all records from the source.json
   file back to the client.
 5.If "q" is specified as a valid string, then only return records from the source.json
   where first name or last name matches the specified q parameter
   (i.e. Sub-string match, case insensitive).
   The records must be returned in the sorted order, descending sort based on the score.
   The returned data from your REST endpoint should be either of these formats:
           JSON
           XML
           Plain Text
 6.Your server should check the “Accept” HTTP header in each request (where the client
   indicates the format that it “Accepts” or “Desires). Based on that, you should decide to return either a JSON, XML or Plain Text.