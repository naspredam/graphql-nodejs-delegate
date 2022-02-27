const queryWithOnlyIds = `{ filterPosts(group: 10) { id } }`;

const queryAllFields = `{
  filterPosts(group: 1) {
      id
      text
      tags
      comments {
        id
        text
      }
    }
  }`;

  export const queries = {
    queryWithOnlyIds,
    queryAllFields,
  }