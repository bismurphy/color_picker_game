with open("color_dataset") as f:
    colorlines = f.readlines()
    outlines = ""
    for i in range(0,len(colorlines),4):
        name = colorlines[i][:-1]
        red = colorlines[i+1][:-1]
        green = colorlines[i+2][:-1]
        blue = colorlines[i+3][:-1]
        outlines += (name + "," + red + "," + green + "," + blue + "\n")
    with open("colors.csv",'w') as out:
        out.write(outlines)
