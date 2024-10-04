from langchain_community.document_loaders import UnstructuredExcelLoader,UnstructuredCSVLoader
import glob
import pandas as pd
path = r"C:\Hackathon\Intel\git\Intel-Hackathon\chatbot\dataset"
file_list = glob.glob(path+"/*.xlsx")
data_list = []
for file in file_list:
    data_list.append(pd.read_excel(file))

    
merge_xl = pd.concat(data_list,ignore_index=True)
merge_xl.to_excel('final.xlsx',index=False)
read_xlsx_file = pd.read_excel('final.xlsx')
read_xlsx_file.to_csv('final.csv',index=None,header=True)
loader = UnstructuredCSVLoader("final.csv")
docs_1 = loader.load()



