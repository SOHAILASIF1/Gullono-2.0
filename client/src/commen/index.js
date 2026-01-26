// const backendDomain ="https://gulluno.onrender.com";
const backendDomain ="http://localhost:7000";


console.log(backendDomain);

const SummaryApi = {
    signup: {
        url: `${backendDomain}/api/user/signup`,
        method: 'post'
    },
    login: {
        url: `${backendDomain}/api/user/login`,
        method: 'post'
    },
    userDetail: {
        url: `${backendDomain}/api/user/details`,
        method: 'get'
    },
    logout: {
        url: `${backendDomain}/api/user/logout`,
        method: 'get'
    },
    allUser: {
        url: `${backendDomain}/api/user/allUser`,
        method: 'get'
    },
    updateUser: {
        url: `${backendDomain}/api/user/updateUser`,
        method: 'post'
    },
    uploadProduct: {
        url: `${backendDomain}/api/product/uploadProduct`,
        method: "post"
    },
    updateProduct: {
        url: `${backendDomain}/api/product/updateProduct`,
        method: "post"
    },
    getAllProduct: {
        url: `${backendDomain}/api/product/allProduct`,
        method: "get"
    },
    deleteProduct: {
        url: (id) => `${backendDomain}/api/product/deleteProduct/${id}`,
        method: "delete"
    },
    categoryWiseProduct: {
        url: `${backendDomain}/api/product/categoryWiseProduct`,
        method: "post"
    },
    getCategory: {
        url: `${backendDomain}/api/product/getCategory`,
        method: "get"
    },
    getProductDetail: {
        url: `${backendDomain}/api/product/getProductDetails`,
        method: "post"
    },
    addToCart: {
        url: `${backendDomain}/api/user/addToCart`,
        method: "post"
    },
    countCart: {
        url: `${backendDomain}/api/user/countCart`,
        method: "get"
    },
    allCartProduct: {
        url: `${backendDomain}/api/user/getCartProduct`,
        method: "get"
    },
    updateCart: {
        url: `${backendDomain}/api/user/updateCart`,
        method: "post"
    },
    deleteCart: {
        url: `${backendDomain}/api/user/deleteCart`,
        method: "post"
    },
    search: {
        url: `${backendDomain}/api/product/search`,
        method: "get"
    },
    createOrder: {
        url: `${backendDomain}/api/order/create-order`,
        method: "post"
    },
    getOrder: {
        url: `${backendDomain}/api/order/getOrder`,
        method: "get"
    },
    updateOrderStatus: {
        url: `${backendDomain}/api/order/update-order-status`,
        method: "PUT"
    },
    deleteOrder: {
        url: (orderId) => `${backendDomain}/api/order/deleteOrder/${orderId}`,
        method: "delete"
    },
    sendEmail: {
        url: `${backendDomain}/api/user/contactUs`,
        method: "post"
    },
    allDileverdOrder: {
        url: `${backendDomain}/api/order/allDileverdOrder`,
        method: "get"
    }
};

export default SummaryApi;
