import express from "express"
import formidable from "express-formidable";


const router = express.Router();
//middleware 
import { requireSignin, isAdmin } from "../middleware/auth.js";
import { create, list, read, photo, remove, update, fillteredProducts, productCount, listProducts,productsSearch, relatedProducts,processPayment, getToken ,orderStatus} from "../controllers/product.js";


router.post("/product",requireSignin, isAdmin,formidable(), create );
router.get("/products", list);
router.get("/product/:slug", read);
router.get("/product/photo/:productId", photo);
router.delete("/product/:productId",requireSignin, isAdmin, remove);
router.put("/product/:productId",requireSignin, formidable(), isAdmin, update);
router.post("/filltered-products", fillteredProducts);
router.get("/product-count", productCount);
router.get("/list-product/:page" , listProducts)
router.get("/products/search/:keyword", productsSearch)
router.get("/related-products/:productId/:categoryId", relatedProducts);

router.get("/braintree/token", getToken);
router.post("/braintree/payment", requireSignin, processPayment)
router.put("/order-status/:orderId",requireSignin, isAdmin,orderStatus )


export default router;