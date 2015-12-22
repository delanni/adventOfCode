input <- readChar("input.txt", file.info("input.txt")$size)

# map the arrows into pairs of x,y coordinates
steps <- lapply(strsplit(input, NULL)[[1]],
               function(item) 
                 switch(item, ">"=c(1,0), "<"=c(-1,0), "^"=c(0,1), "v"=c(0,-1))
)

# split them by column
xSteps <- lapply(steps, function(e) e[1])
ySteps <- lapply(steps, function(e) e[2])

# cumsum cumulately summates the X or Y displacement
xPos <- cumsum(xSteps)
yPos <- cumsum(ySteps)

# To see Santa's path, check this
#plot(xPos, yPos)

# Bind the columns together, and add starting position
positions <- cbind2(xPos,yPos)
positions <- rbind2(positions, c(0,0))

# Now we have two columns of matching x y positions
# unique() treats them as rows, and gets distinct rows
# length() however treats them as single elements, so we need to divide by two
n <- length(unique(positions)) / 2

# Part 1
print(n)

# Cull santa's and robo's steps into different pairs
xStepsSanta <- xSteps[c(T,F)]
yStepsSanta <- ySteps[c(T,F)]

xStepsRobo <- xSteps[c(F,T)]
yStepsRobo <- ySteps[c(F,T)]

# Do the same shit
xPosSanta <- cumsum(xStepsSanta)
yPosSanta <- cumsum(yStepsSanta)
xPosRobo <- cumsum(xStepsRobo)
yPosRobo <- cumsum(yStepsRobo)

positionsSanta <- cbind2(xPosSanta,yPosSanta)
positionsRobo <- cbind2(xPosRobo, yPosRobo)

# At the end, bind them rows together, so that we can count unique pairs
positionsTogether <- rbind2(positionsSanta, positionsRobo)
positionsTogether <- rbind2(positionsTogether, c(0,0))

n2 <- length(unique(positionsTogether))/2

# Part 2
print(n2)