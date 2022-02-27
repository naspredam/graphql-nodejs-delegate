const responseBodyIds = {
  "data": {
    "filterPosts": [
      {
        "id": "8"
      }
    ]
  }
};

const responseBodyWithAllFields = {
  "data": {
    "filterPosts": [
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
        "id": "4",
        "text": "text4",
        "tags": [
          "tag4"
        ],
        "comments": [
          {
            "id": "41",
            "text": "comment text 4-1"
          }
        ]
      }
    ]
  }
};

const responseBodyOnePostsFromRemote = [
  { id: "8", text: 'text8', tags: ['tag8'], comments: [{ id: 81, text: 'comment text 8-1' }] }
];

const responseBodyTwoPostsFromRemote = [
  { id: "1", text: 'text1', tags: ['tag1'], comments: [{ id: 11, text: 'comment text 1-1' }] },
  { id: "4", text: 'text4', tags: ['tag4'], comments: [{ id: 41, text: 'comment text 4-1' }] }
];



export const responses =  {
  responseBodyIds,
  responseBodyWithAllFields,
  responseBodyOnePostsFromRemote,
  responseBodyTwoPostsFromRemote,
}