# test model for returning dummy data from /examples endpoint

class Example:
    def __init__(self, id, data):  
        self.id = id  
        self.data = data 
    id = int
    data =  str