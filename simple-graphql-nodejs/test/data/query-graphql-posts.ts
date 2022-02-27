const queryWithOnlyIds = `{ posts { id } }`;

const queryFindByIdWithOnlyIds = `{ findById(ids: ["1", "5"]) { id } }`;

const queryAllFields = `{
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

  const queryAllFieldsWithFilter = `{
    findById(ids: ["1", "4"]) {
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
    queryFindByIdWithOnlyIds,
    queryAllFieldsWithFilter,
  }