import axios from 'axios'
import Vue from 'vue'
import router from './router/index'

const http=axios.create({
	baseURL:process.env.VUE_APP_API_URL || '/admin/api'
})

http.interceptors.request.use(config=>{
	if(localStorage.token){
		config.headers.Authorization='Bearer '+localStorage.token
	}
	return config
})

http.interceptors.response.use(res=>{
	return res
},err=>{
	// eslint-disable-next-line no-console
	console.log(err.response)
	if(err.response.data.message){
		Vue.prototype.$message({
			type:'error',
			message:err.response.data.message
		})
	}
	if(err.response.status===401){
		router.push('/login')
	}
	return Promise.reject(err)
})

export default http