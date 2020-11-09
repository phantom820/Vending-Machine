import pymongo
from bson.json_util import dumps
from dotenv import load_dotenv
import data_models
import os

#load connection string
load_dotenv()

class CoinHandler:
    def __init__(self):
        self.client = pymongo.MongoClient(os.getenv("MONGO_URL"))
        self.database = self.client["Vending-Machine"]
        self.coins = self.database["Coins"]

    #retrieve all the coins
    def get_data(self):
        try:
            documents = self.coins.find({})
            return dumps(documents)
        except:
            return "coin retrieval error"
		
    #update an existing coin counts when purchasing
    def update_data(self,parameters):
        if parameters!=None:
            try:
                #for each coin value decrement nnumber of coins according
                for value in parameters:
                    query = { "value":int(value)}
                    new_values = { "$inc": { "count": -1*parameters[value]}}
                    self.coins.update_one(query,new_values)
                return self.get_data()
            except:
                return "coin update error"
        else:
            return "coin parameters missing"