import logging
import os
import sys
import time

from .DictionaryDB import MysqlDb


def userLogin(username, password):
    try:
        mydb = MysqlDb()
        mydb.initDB()

        select_sql = "SELECT * FROM  user_list WHERE user_name = '" + username + "' and user_password = '" + password +"';"

        data_Collection = mydb.select_data(select_sql)

        result = data_Collection['num']

        mydb.close_connect()

        if (result == 0):
            return 0
        else:
            return 1
    except Exception as e:
        logging.exception(e)
        return -1

def createNewUser(username ,password, email, ip):
    try:
        mydb = MysqlDb()
        mydb.initDB()

        select_sql = "SELECT * FROM  user_list WHERE user_name = '" + username + "' and user_password = '" + password +"';"
        data_Collection = mydb.select_data(select_sql)

        result = data_Collection['num']

        if result == 0:
            localtime = time.strftime("%Y%m%d%H%M%S", time.localtime())

            insSql="INSERT INTO user_list VALUES (null, '" + username + "', '" + password + "', '" + ip + "' , '" + localtime + "');"
            print(insSql)
            param = ('test@test.org', 'very-secret')
            result = mydb.insert_data(insSql, None)
            mydb.close_connect()

            return result
    except Exception as e:
        logging.exception(e)
        return -1


def saveUserReviseAction(username, reviseID, reviseResult, entryID, vbID):
    try:
        mydb = MysqlDb()
        mydb.initDB()

        localtime = time.strftime("%Y%m%d%H%M%S", time.localtime())

        insSql = "INSERT INTO user_action VALUES ('" + reviseID + "', '" + username + "', " + vbID + ", " + reviseResult + ", " + entryID + ",'" + localtime + "');"
        print(insSql)
        param = ('test@test.org', 'very-secret')
        result = mydb.insert_data(insSql, None)
        mydb.close_connect()

        return result
    except Exception as e:
        logging.exception(e)
        return -1

def getUserReviseAction(username):
    try:
        mydb = MysqlDb()
        mydb.initDB()

        select_sql0 = "SELECT id_revise, id_vb, count(*) FROM user_action WHERE user_name = '" + username + "' group by id_revise, id_vb;"
        resultData0 = mydb.select_data(select_sql0)

        resultCount0 = resultData0['num']
        resultList0 = resultData0['result']

        resultAllData = []

        for i in range(0, resultCount0) :
            id_revise = resultList0[i][0]
            total_item = resultList0[i][2]
            select_sql1 = "SELECT count(*) FROM user_action WHERE id_revise = '" + id_revise + "' and revise_result = 0;"
            resultData1 = mydb.select_data(select_sql1)

            select_sql2 = "SELECT min(update_date), max(update_date) FROM user_action WHERE id_revise = '" + id_revise + "';"
            resultData2 = mydb.select_data(select_sql2)

            id_vb = resultList0[i][1]
            select_sql3 = "SELECT vb_name FROM vb_list WHERE id_vb = " + str(id_vb) + ";"
            resultData3 = mydb.select_data(select_sql3)

            oneItemData = {"revise_id": id_revise, "vb_name":resultData3['result'][0][0], "total_count":total_item, "correct_count":resultData1['num'], "start_time":resultData2['result'][0][0], "end_time":resultData2['result'][0][1]}
            resultAllData.append(oneItemData)

        mydb.close_connect()

        return resultAllData

    except Exception as e:
        logging.exception(e)
        return -1