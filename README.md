## NodeJS-Crawler

### Install Dependencies

```bash
npm install
``` 
### Run

  ```bash
  npm run start 
  ```
 

# REST API

## Extract data from list of topics
### Request

`POST /crawlers/jira/topics`

    curl --location --request POST 'localhost:5000/crawlers/jira/topics' \
        --header 'Content-Type: application/json' \
        --data-raw '{
          "urls": [ 
              "https://support.atlassian.com/jira-software-cloud/docs/what-are-the-project-templates/",
              "https://support.atlassian.com/jira-software-cloud/docs/what-are-time-estimates-days-hours-minutes/"
          ],
          "crawler": "puppeteer" 
      }'

### Response 
  {
    "status": "success",
    "data": [...],
    "failures": []
  }
 



## Extract whole documentation from resources page, including topics data
### Request

`POST /crawlers/jira/resources`

    curl --location --request POST 'localhost:5000/crawlers/jira/resources' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "url": "https://support.atlassian.com/jira-software-cloud/docs/plan-and-view-cross-project-work-with-advanced-roadmaps/",
        "extract_topic_data": true,
        "include_heading": false,
        "collections_included": false
    }'

### Response 
  {
    "status": "success",
    "data": [...],
    "failures": []
  }