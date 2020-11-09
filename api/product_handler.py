import pymongo
from bson.json_util import dumps
from dotenv import load_dotenv
import data_models
import os

#load connection string
load_dotenv()

class ProductHandler:
	def __init__(self):
		self.client = pymongo.MongoClient(os.getenv("MONGO_URL"))
		self.database = self.client["Vending-Machine"]
		self.products = self.database["Products"]
	
	#retrieve all the products
	def get_data(self):
		documents = self.products.find({})
		return dumps(documents)
		
	#insert a new product 
	def post_data(self,parameters):
		attributes = ['name','price','count']
		if parameters!=None and not bool(parameters.keys()-set(attributes)):
			try:
				code = 1+self.products.count()
				name = parameters['name']
				price = parameters['price']
				count = parameters['count']
				product = data_models.Product(code,name,price,count)
				product_map = product.to_map()
				self.products.insert_one(product_map)
				return str(product_map)
			
			except:
				return 'insertion error'
		else:
			return 'product parameters missing'

	#update an existing product subtract count value 
	def update_data(self,parameters):
		attributes = ['code']
		if parameters!=None and not bool(parameters.keys()-set(attributes)):
			try:
				print(parameters)
				query = { "code":parameters["code"]}
				new_values = { "$inc": { "count": -1}}
				k = self.products.update_one(query,new_values)
				return self.get_data()
			except:
				return "update error"
		else:
			return "product parameters missing"