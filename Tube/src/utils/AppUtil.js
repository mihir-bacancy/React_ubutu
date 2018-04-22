/**
 * @providesModule AppUtils
 */

import { API_BASE_URL, getAuthToken, queryString, userLogout } from 'global';


const isTokenExpire = async (responseJson) => {
    if (typeof responseJson == 'string' && responseJson.includes('token')) {
        userLogout();
        return false;
    }
    return responseJson;
}

const AppUtils = {

    login : function(data) {
        return fetch(API_BASE_URL+'/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            setTimeout(() => null, 0);
            return response.json();
        });
    },

    register : function(data) {
        return fetch(API_BASE_URL+'/user/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            setTimeout(() => null, 0);
            return response.json();
        });
    },

    forgotPassword : function(data) {
        return fetch(API_BASE_URL+'/user/forgotPassword', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            setTimeout(() => null, 0);
            return response.json();
        });
    },

    updateProfile : async function(data) {
        return await fetch(API_BASE_URL+'/user/profile', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': await getAuthToken()
            },
            body: JSON.stringify(data)
        }).then((response) => {
            setTimeout(() => null, 0);
            return response.json();
        });
    },

    updateAvatar: async function(profileImage){
        let body = new FormData()
        body.append('profileImage', profileImage);
        return await fetch(API_BASE_URL+'/user/profileImage', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': await getAuthToken()
            },
            body:body
        }).then((response) => {
            setTimeout(() => null, 0);
            return response.json();
        });
    },

    getCategory : async function() {
        return await fetch(API_BASE_URL+'/category', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            setTimeout(() => null, 0);
            return response.json();
        });
    },

    getCoursesByCategory : async function({courseId}) {
        return await fetch(API_BASE_URL+'/category/'+ courseId +'/course', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            setTimeout(() => null, 0);
            return response.json();
        });
    },

    getPopularCourses : async function({limit}) {
        return await fetch(API_BASE_URL+'/course/popular/'+ limit, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            setTimeout(() => null, 0);
            return response.json();
        });
    },

    getCourseDetailsWithVideo : async function({courseId}) {
        return await fetch(API_BASE_URL+'/course/'+ courseId+'/video/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            setTimeout(() => null, 0);
            return response.json();
        });
    },

    getSubscribedCourses : async function() {
        return await fetch(API_BASE_URL+'/course/subscribe', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': await getAuthToken()
            }
        }).then((response) => {
            setTimeout(() => null, 0);
            return response.json();
        });
    },

    getVideoByCourse : function({courseId}) {
        return fetch(API_BASE_URL+'/course/'+ courseId +'/video', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setTimeout(() => null, 0);
            return response.json();
        });
    },

    subscribeToCourse : async function({courseId}) {
        return await fetch(API_BASE_URL+'/course/'+ courseId +'/subscribe', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': await getAuthToken()
            }
        }).then((response) => {
            setTimeout(() => null, 0);
            return response.json();
        });
    },

    getVideoDetails : async function({videoId}) {
        return fetch(API_BASE_URL+'/video/'+videoId+'/attempt', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': await getAuthToken()
            }
        }).then((response) => {
            setTimeout(() => null, 0);
            return response.json();
        });
    },

    uploadUserAttempt: async function(data){
        let body = new FormData();
        body.append('video', {uri:'file://'+data.videoUrl,filename:'attempt.mov',name:'attempt.mov'});
        body.append('title', data.title);
        body.append('free', data.free);
        return await fetch(API_BASE_URL+'/video/'+data.videoId+'/attempt', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': await getAuthToken()
            },
            body:body
        }).then((response) => {
            setTimeout(() => null, 0);
            return response.json();
        });
    },
    uploadTutorAttempt:async function(data){
        let body = new FormData();
        body.append('video', {uri:'file://'+data.videoUrl,filename:'TutorCourseVideo.mov',name:'Tutor Course Video.mov'});
        body.append('title', data.title);
        body.append('free', data.free);
        return await fetch(API_BASE_URL+'/course/'+data.courseId+'/video', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': await getAuthToken()
            },
            body:body
        }).then((response) => {
            setTimeout(() => null, 0);
            return response.json();
        });
    },

    getVideoDetailsGuest : async function({videoId}) {
        return fetch(API_BASE_URL+'/video/'+videoId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            setTimeout(() => null, 0);
            return response.json();
        });
    },
}

module.exports = AppUtils;
