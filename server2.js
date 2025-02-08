const { createServer } = require("node:http");
const fs = require("fs");
const url = require("url");

const hostname = "127.0.0.1";
const port = 3000;
const dataFilePath = "./dev-data/data.json";

const server = createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === "/" || pathname === "/overview") {
        let data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

        const singleProductTemplate = fs.readFileSync("./templates/singleProduct.html", "utf8");

        data = data.map(e => {
            return singleProductTemplate
                .replaceAll("{{productName}}", e.productName)
                .replaceAll("{{quantity}}", e.quantity)
                .replaceAll("{{img}}", e.image)
                .replaceAll("{{price}}", e.price)
                .replaceAll("{{id}}", e.id);
        });

        let overviewTemplate = fs.readFileSync("./templates/overview.html", "utf8");
        overviewTemplate = overviewTemplate.replace("{{content}}", data.join(""));

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(overviewTemplate);
    } else if (pathname === "/product") {
        let productTemplate = fs.readFileSync("./templates/product.html", "utf8");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(productTemplate);
    } else if (pathname === "/search") {
        let searchTemplate = fs.readFileSync("./templates/search.html", "utf8");
        let data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
        const keyWord = query.q?.trim();

        const product = data.find(p => p.productName.toLowerCase() === keyWord?.toLowerCase());

        if (product) {
            let productTemplate = fs.readFileSync("./templates/singleProduct.html", "utf8");
            productTemplate = productTemplate
                .replaceAll("{{productName}}", product.productName)
                .replaceAll("{{price}}", product.price)
                .replaceAll("{{description}}", product.description)
                .replaceAll("{{img}}", product.image);

            res.writeHead(302, { Location: `/product/${product.id}` });
            res.end(productTemplate);
        } else {
            searchTemplate = searchTemplate.replace("{{message}}", "NOT FOUND");
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(searchTemplate);
        }
    } else if (pathname === "/create") {
        if (req.method === "POST") {
            let data = "";

            req.on("error", (err) => {
                console.error("Lỗi khi nhận request:", err);
            });

            req.on("data", (chunk) => {
                data += chunk.toString();
            });

            req.on("end", () => {
                let products = JSON.parse(fs.readFileSync('./dev-data/data.json', "utf8"));

                const queryString = url.parse(`/?${data}`, true).query;
                const newProduct = {
                    id: products.length + 1,
                    productName: queryString.productName,
                    price: queryString.price,
                    description: queryString.description,
                };

                // Ghi vào JSON file
                products.push(newProduct);
                fs.writeFileSync('./dev-data/data.json', JSON.stringify(products, null, 2));

                console.log("Sản phẩm mới:", newProduct);

                // Redirect về trang chủ
                res.writeHead(302, { Location: "/" });
                res.end();
            });
        } else {
            // Gửi lại form HTML khi GET
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(fs.readFileSync("./templates/create.html", "utf8"));
        }
    } else {
        res.statusCode = 404;
        res.end("404 Not Found");
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
