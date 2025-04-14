import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { dirname } from "path";
import  winston  from "winston";



export const createHash = async (password) => {
  const salts = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salts);
};

export const passwordValidation = async (user, password) =>
  bcrypt.compare(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "./src/logs/error.log",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    
    new winston.transports.Console({
      level: "silly",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});
 export const addLogger = (req, res, next)=>{
    req.logger = logger;
    req.logger.info(`Request method : ${req.method}, URL : ${req.url}`)
    next()
 }


export default __dirname;
