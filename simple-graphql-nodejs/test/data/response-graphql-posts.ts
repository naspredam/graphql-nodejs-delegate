export const responseBodyIds = {
  "data": {
    "posts": [
      {
        "id": "1"
      },
      {
        "id": "2"
      }
    ]
  }
};

export const responseBodyWithAllFields = {
  "data": {
    "posts": [
      {
        "id": "1",
        "text": "text1",
        "tags": [
          "tag1"
        ],
        "comments": [
          {
            "id": "11",
            "text": "comment text 1-1"
          }
        ]
      },
      {
        "id": "2",
        "text": "text2",
        "tags": [
          "tag2"
        ],
        "comments": [
          {
            "id": "21",
            "text": "comment text 2-1"
          }
        ]
      }
    ]
  }
};