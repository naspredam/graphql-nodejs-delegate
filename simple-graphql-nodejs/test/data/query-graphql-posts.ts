export const qureyWithOnlyIds = `{ posts { id } }`;

export const queryAllFields = `{
    posts {
      id
      text
      tags
      comments {
        id
        text
      }
    }
  }`;