import { request } from 'utils/axios';
import 'mock/dataMock'
import { base64toBlob } from 'utils/tools';

let proxy = '', prefix = '';


if (process.env.NODE_ENV === 'development') {
  proxy = '/api';
}
if (process.env.NODE_ENV === 'production') {
  proxy = '';
}

// export const initProject = () => {
//   return request(`${proxy}${prefix}/azeroth/aui/project.html`, {
//     method: 'POST',
//     data: {
//       appId: '10001',
//       projectName: '10001'
//     }
//   }).then((res: any) => {
//     if (res.code === 100) {
//       return res.datas
//     } else {
//       console.log('message:', res.message)
//     }
//   });
// }

// get project data
export const getProjectData = () => {
  return request(`${proxy}${prefix}/azeroth/aui/project.html`, {
    method: 'POST',
    data: {
      appId: '10001',
      projectName: '10001'
    }
  }).then((res: any) => {
    if (res.code === 100) {
      return res.data
    } else {
      console.log('message:', res.message)
    }
  });
}

// get project data
export const getProjectList = (appId: string | number) => {
  return request(`${proxy}${prefix}/azeroth/aui/project/${appId}.html`, {
    method: 'GET',
    params: {
      appId: '10001',
    }
  }).then((res: any) => {
    if (res.code === 100) {
      return res.data || []
    } else {
      console.log('message:', res.message)
    }
  });
}

// getPageList
export const getPageList = (projectId: any) => {
  return request(`${proxy}${prefix}/azeroth/page/${projectId}.html`, { method: 'GET' }).then((res: any) => {
    if (res.code === 100) {
      return res.data || {}
    } else {
      console.log('message:', res.message)
    }
  });
}

// createNewPage
export const createNewPage = (data: any) => {
  return request(`${proxy}${prefix}/azeroth/page.html`, {
    method: 'POST',
    data
  }).then((res: any) => {
    if (res.code === 100) {
      return res.data
    } else {
      console.log('message:', res.message)
    }
  });
}

// renamePage
export const renamePage = (data: any) => {
  return request(`${proxy}${prefix}/azeroth/page/rename.html`, {
    method: 'PUT',
    data
  }).then((res: any) => {
    if (res.code === 100) {
      return res.data
    } else {
      console.log('message:', res.message)
    }
  });
}


// deletePage
export const deletePage = (data: any) => {
  return request(`${proxy}${prefix}/azeroth/page/${data.projectId}/${data.pageId}.html`, {
    method: 'DELETE',
  }).then((res: any) => {
    if (res.code === 100) {
      return res.data
    } else {
      console.log('message:', res.message)
    }
  });
}

// updatePagePosition
export const updatePageList = (data: any) => {
  return request(`${proxy}${prefix}/azeroth/page/position.html`, { method: 'PUT', data }).then((res: any) => {
    if (res.code === 100) {
      return res.datas
    } else {
      console.log('message:', res.message)
    }
  });
}

// getPageData
export const getPageData = (pageId: any) => {
  return request(`${proxy}/azeroth/aui/nodes/${pageId}.html`, { method: 'GET' }).then((res: any) => {
    if (res.code === 100) {
      return res.data
    } else {
      console.log('message:', res.message)
    }
  });
}

// updatePageData
export const updatePageData = (pageId: any) => {
  return request(`${proxy}/azeroth/aui/nodes/${pageId}.html`, { method: 'GET' }).then((res: any) => {
    if (res.code === 100) {
      return res.data
    } else {
      console.log('message:', res.message)
    }
  });
}

// saveElements
export const saveElements = (data: any) => {
  return request(`${proxy}/getProjectData`, { method: 'GET' }).then((res: any) => {
    if (res.code === 100) {
      return res.datas
    } else {
      console.log('message:', res.message)
    }
  });
}

// cropperImage
export const uploadImage = (data: any) => {
  const formData = new FormData();
  // formData.append('name', 'file')
  formData.append('file', base64toBlob(data.uri))
  return request(`${proxy}/azeroth/image/upload.html`, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData
  }).then((res: any) => {
    if (res.code === 100) {
      return res.data
    } else {
      console.log('message:', res.message)
    }
  });
}

// getSystemList
export const getSystemList = () => {
  const appId = 6952064908101;
  return request(`${proxy}${prefix}/azeroth/system/${appId}.html`, { method: 'GET' }).then((res: any) => {
    if (res.code === 100) {
      let tmp = [...res.data];
      tmp[0].rules = [{ruleName:"test1"}, {ruleName:"test2"}, {ruleName:"test3"}];
      tmp[0].ruleTotal = 3;
      return tmp || []
    } else {
      console.log('message:', res.message)
    }
  });
  /*
  const appId = 6952064908101;
  return request(`${proxy}${prefix}/azeroth/system/${appId}.html`, { method: 'GET' }).then((res: any) => {
    if (res.code === 100) {
      return res.data || []
    } else {
      console.log('message:', res.message)
    }
  });*/
}

// getRuleIllustrate
export const getRuleIllustrate = (ruleId: string) => {
  return request(`${proxy}${prefix}/assetflow/rule/${ruleId}.html`, { method: 'GET' }).then((res: any) => {
    if (res.code === 100) {
      return res.data || {}
    } else {
      console.log('message:', res.message)
    }
  });
}

// upDateRuleUsed
export const upDateRuleUsed = (data: any) => {
  return request(`${proxy}${prefix}/azeroth/system/rule/use.html`, { method: 'POST', data }).then((res: any) => {
    if (res.code === 100) {
      return res.data || {}
    } else {
      console.log('message:', res.message)
    }
  });
}

// getRuleScenarios
export const getRuleScenarios = (ruleId: any) => {
  return request(`${proxy}${prefix}/assetflow/rule/scenario/${ruleId}.html`, { method: 'GET' }).then((res: any) => {
    if (res.code === 100) {
      return res.data || {}
    } else {
      console.log('message:', res.message)
    }
  });
}


// getRuleAccessible
export const getRuleAccessible = (ruleId: any) => {
  return request(`${proxy}${prefix}/assetflow/accessible/${ruleId}.html`, { method: 'GET' }).then((res: any) => {
    if (res.code === 100) {
      return res.data || []
    } else {
      console.log('message:', res.message)
    }
  });
}

// ir search
export const getIrSearchList = (ruleName: any) => {
  const appId = 6952064908101;
  return request(`${proxy}${prefix}/azeroth/system/rule/search/${appId}/${ruleName}.html`, { method: 'GET' }).then((res: any) => {
    if (res.code === 100) {
      return res.data || []
    } else {
      console.log('message:', res.message)
    }
  });
}





