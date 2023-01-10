
def parseFen(value):

    retVal='1'
    if value=='wk':retVal='K'
    elif value== 'wq':retVal='Q'
    elif value== 'wr':retVal='R'
    elif value== 'wn':retVal='N'
    elif value== 'wb':retVal='B'
    elif value== 'wp':retVal='P'
    elif value== 'bk':retVal='k'
    elif value== 'bq':retVal='q'
    elif value== 'br':retVal="r"
    elif value== 'bn':retVal="n"
    elif value== 'bb':retVal="b"
    elif value== 'bp':retVal="p"

    return retVal

def repairFen(fen):

    repairedFen=""
    loc_cnt=0
    for x in range(len(fen)):
        if fen[x]=='1':
            loc_cnt+=1
        elif fen[x]!='1' and loc_cnt==0:
            repairedFen+=fen[x]
        else:
            repairedFen+=str(loc_cnt)
            repairedFen+=fen[x]
            loc_cnt=0


    return repairedFen[0:len(repairedFen)-1]

def reverseFen(fen):
    return fen[::-1]

