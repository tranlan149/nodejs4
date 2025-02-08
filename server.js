// // const fs = require('fs');
// // const http = require('http');

// // const hostname = '127.0.0.1';
// // const port = 3000;

// // const server = http.createServer((req, res) => {
// //   const filePath = '../txt/final.txt'; // Đường dẫn đến file txt
  
// //   // Đọc file và trả về cho người dùng
// //   fs.readFile(filePath, (err, data) => {
// //     if (err) {
// //       res.statusCode = 500;
// //       res.setHeader('Content-Type', 'text/plain');
// //       res.end('Error reading the file');
// //       return;
// //     }
    
// //     // Thiết lập tiêu đề Content-Type và Content-Disposition để tải về file
// //     res.setHeader('Content-Type', 'text/plain');
// //     res.setHeader('Content-Disposition', 'attachment; filename="file.txt"');
// //     res.statusCode = 200;
// //     res.end(data);
// // //   });
// // });

// // server.listen(port, hostname, () => {
// //   console.log(`Server chạy tại http://${hostname}:${port}/`);
// // });
// // server.js
// const http = require('http');
// const fs = require('fs');
// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
    
    
// //   if(req.url==='/'){
// //     res.end('<h1>This is homepage<h1>')
// //   }
// //   else if(req.url === '/overview'){
// //     res.end('<h1>This is overview page<h1>');
// //   }
// //   else if(req.url === '/product'){
// //     res.end('<h1>This is product page<h1>');
// //   }
// //   else{
// //     res.end('<h1>page not 404<p>');
// //   }
//    fs.readFileSync('../dev-data/data.json', (err, data)=>{
//         if(err){
//             res.statusCode = 500;
//             res.setHeader('Content-Type', 'text/plain');
//             res.end('Error reading the file');
//             return;
//         }
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.end();


//    })
    
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// const http = require('http');
// const fs = require('fs');
// const { url } = require('inspector');
// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {

//   let filePath = '';
//   if(req.url === '/' || req.url === '/overview'){
//     filePath = '../templates/overview.html';
//   }
//   else if(req.url==='/product'){
//     filePath = '../templates/product.html';
//   }
//   fs.readFile(filePath,'utf8', (err, data)=>{
//     if(err){
//       res.statusCode = 500;
//       res.end('error');
//     }
//     res.statusCode = 200;
//     res.setHeader('Content-Type','utf8', 'text/html');
//     res.end(data);
//   })
 
//   const filePath = '../dev-data/data.json'; // Đảm bảo đường dẫn chính xác đến file JSON

//   // Đọc file và trả về cho người dùng
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       res.statusCode = 500;
//       res.setHeader('Content-Type', 'application/json');
//       res.end(JSON.stringify({ error: 'Error reading the file' }));
//       return;
//     }

//     // Parse dữ liệu JSON thành đối tượng JavaScript
//     const jsonData = JSON.parse(data);

//     // Log dữ liệu ra console
//     console.log(jsonData);

//     // Thiết lập tiêu đề và trả về nội dung file JSON
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');

//     // Điều kiện để xử lý các route khác nhau
//     if (req.url === '/api') {
//       // Trả về toàn bộ dữ liệu JSON khi truy cập /api
//       res.end(JSON.stringify(jsonData));
//     } else if (req.url.startsWith('/api/')) {
//       // Truy xuất id từ URL
//       const id = req.url.split('/')[2];

//       // Kiểm tra nếu id hợp lệ và nằm trong phạm vi của mảng
//       if (id >= 0 && id < jsonData.length) {
//         res.end(JSON.stringify(jsonData[id]));
//       } else {
//         res.statusCode = 404;
//         res.end(JSON.stringify({ error: 'ID not found' }));
//       }
//     } else {
//       res.statusCode = 404;
//       res.end(JSON.stringify({ error: 'Route not found' }));
//     }
//   });
//  });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');

const server = createServer((req, res) => {
  
  
  
  if(req.url === '/'){
    res.end('<h1>hello<h1>');
  }
  else if(req.url === '/overview'){

  }
  else if(req.url === '/product'){

  }
  else if(req.url.startsWith("/api")){
    
    // let data = JSON.parse(fs.readFileSync('../dev-data/data.json'));
    // res.setHeader('Content-Type', 'aplication/json');
    // res.end(JSON.stringify(data));
    //Tach nho url theo dau gach
    console.log(req.url.split("/"));
    let urlArr = req.url.split("/");
    if(urlArr.length === 2){
      let data = JSON.parse(fs.readFileSync('./dev-data/data.json'));
      res.setHeader('Content-Type', 'aplication/json');
      res.end(JSON.stringify(data));
      
    }   
    else{
      let id = urlArr[urlArr.length-1];
      let data = JSON.parse(fs.readFileSync('./dev-data/data.json'));
      let productData = data.find(function(e,i){
        return e.id === +id;
      })
      res.end(JSON.stringify(productData));
      
    }
  }
  else{

  }
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



