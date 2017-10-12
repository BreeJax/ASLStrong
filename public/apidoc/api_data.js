define({ "api": [  {    "type": "get",    "url": "/api/categories",    "title": "getting all available categories found in the table",    "name": "get_all_categories_in_table",    "group": "search_by_Categories",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Array",            "optional": false,            "field": "words",            "description": "<p>Array of words that belong to Categories- non repeating.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n\n  [\n      \"Alphabet\",\n      \"Animals\",\n      \"ASL For Baby\",\n      \"Baby\",\n      \"Body\",\n      \"Clothes\",\n      \"Country\",\n      \"Family\",\n      \"Food\",\n      \"Geography\",\n      \"Health\",\n      \"Holidays\",\n      \"House\",\n      \"Music\",\n      \"Nature\",\n      \"occupations\",\n      \"Recreation\",\n      \"Religious\",\n      \"School\",\n      \"Time\",\n      \"Wedding\"\n    ]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./routes/api.js",    "groupTitle": "search_by_Categories"  },  {    "type": "get",    "url": "/api/categories/:category",    "title": "getting all of the words by their category",    "name": "get_all_words_by_their_category",    "group": "search_by_Categories",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Array",            "optional": false,            "field": "words",            "description": "<p>Array of objects tht have words and videoId.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n    \"info\": [\n      {\n        \"id\": 30,\n        \"videoId\": 35,\n        \"categories\": [\n        \"Food\",\n        \"ASL For Baby\"\n      ],\n      \"words\": [\n        \"Soup\"\n      ],\n      \"createdAt\": \"2017-10-07T18:45:12.518Z\",\n      \"updatedAt\": \"2017-10-07T18:45:12.518Z\"\n      },\n    {\n    \"id\": 35,\n    \"videoId\": 40,\n    \"categories\": [\n    \"Food\"\n    ],\n    \"words\": [\n      \"Sour\"\n    ],\n    \"createdAt\": \"2017-10-07T18:45:14.017Z\",\n    \"updatedAt\": \"2017-10-07T18:45:14.017Z\"\n    },*\n  }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./routes/api.js",    "groupTitle": "search_by_Categories"  },  {    "type": "get",    "url": "/api/allwords",    "title": "getting all of the words(in array form) and their corresponding video Id, along with their categories(in array form)",    "name": "get_all_words",    "group": "search_by_English_words",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Array",            "optional": false,            "field": "words",            "description": "<p>Array of objects tht have words and videoId.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"words\": [\n      {\n        \"words\": [\n          \"point of interest\"\n        ],\n        \"videoId\": 41\n        }\n      ]\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./routes/api.js",    "groupTitle": "search_by_English_words"  },  {    "type": "get",    "url": "/api/word/:wordid",    "title": "getting specific word array and all info associated with it by it's specific id (not including category).",    "name": "get_all_words_by_id_with_url_and_HOLMEs",    "group": "search_by_English_words",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Array",            "optional": false,            "field": "words",            "description": "<p>Array of objects tht have words and categories.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "    HTTP/1.1 200 OK\n{\n  \"words\": {\n    \"words\": [\n      \"yard measurement\"\n      ],\n      \"videoId\": 111\n      },\n      \"video\": {\n        \"id\": 111,\n        \"videoURL\": \"https://www.youtube.com/watch?v=OzRwnJEjXBU\",\n        \"dominateHand\": \"\",\n        \"nonDominateHand\": \"\",\n        \"orientation\": \"\",\n        \"location\": \"\",\n        \"movement\": \"\",\n        \"expression\": \"\",\n        \"createdAt\": \"2017-10-09T16:04:35.443Z\",\n        \"updatedAt\": \"2017-10-09T16:04:35.443Z\"\n      }\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./routes/api.js",    "groupTitle": "search_by_English_words"  },  {    "type": "get",    "url": "/api/letter/:letter",    "title": "getting all arrays with a word starting with a searched letter in it",    "name": "get_all_words_starting_with_letter",    "group": "search_by_English_words",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Array",            "optional": false,            "field": "words",            "description": "<p>Array of objects tht have words and categories.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"words\": [\n        {\n        \"id\": 12,\n        \"videoId\": 17,\n        \"categories\": [\n          \"Nature\",\n          \"Geography\",\n          \"ASL For Baby\"\n        ],\n        \"words\": [\n          \"Beach\"\n        ],{\n        \"id\": 21,\n        \"videoId\": 26,\n        \"categories\": [\n        \"Animals\"\n        ],\n        \"words\": [\n          \"Bee\"\n        ],\n        \"createdAt\": \"2017-10-06T21:04:48.575Z\",\n        \"updatedAt\": \"2017-10-06T21:04:48.575Z\"\n        },\n\n      },\n      ]\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./routes/api.js",    "groupTitle": "search_by_English_words"  }] });
