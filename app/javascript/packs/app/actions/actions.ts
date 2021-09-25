export const fetchMaterials = async (callback) => {
  const response = await fetch('/api/materials.json');

  if (response.status === 200) {
    const responseJson = await response.json();
    if (responseJson.success) {
      callback(true, responseJson.data);
    }
  } else {
    callback(false, []);
  }
}

export const fetchPartners = async ({request_id, page, perPage}, callback) => {
  const response = await fetch(`/api/requests/${request_id}/partners.json?page=${page}&per_page=${perPage}`);

  if (response.status === 200) {
    const responseJson = await response.json();
    if (responseJson.success) {
      callback(true, responseJson.data);
    }
  } else {
    callback(false, []);
  }
}

export const fetchPartner = async ({ partner_id }, callback) => {
  const response = await fetch(`/api/partners/${partner_id}.json`);

  if (response.status === 200) {
    const responseJson = await response.json();
    if (responseJson.success) {
      callback(true, responseJson.data);
    }
  } else {
    callback(false, []);
  }
}

export const fetchRequests = async ({ page, perPage }, callback) => {
  const response = await fetch(`/api/requests.json?page=${page}&per_page=${perPage}`);

  if (response.status === 200) {
    const responseJson = await response.json();
    if (responseJson.success) {
      callback(true, responseJson.data);
    }
  } else {
    callback(false, []);
  }
}