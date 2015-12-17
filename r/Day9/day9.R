# Now this is a complicated one again
input <- readLines("input.txt")

# Retrieve the size of the cities length
len <- length(input)

for (n in 1:len) {
  if (n * (n - 1) / 2 == len) {
    len <<- n
    break
  }
}

# Create a matrix for that
distMatrix <- matrix(0, nrow = len, ncol = len)

# Gather the city names
citynames <- c()

for (line in input) {
  m <- gregexpr("\\w+", line)
  m <- regmatches(line, m)[[1]]
  
  citynames <- c(m[1],m[3],citynames)
}

citynames <- unique(citynames)

# Name the matrix
rownames(distMatrix) <- citynames
colnames(distMatrix) <- citynames

# Fill in the matrix values
for (line in input) {
  m <- gregexpr("\\w+", line)
  m <- regmatches(line, m)[[1]]
  c1 <- m[1]
  c2 <- m[3]
  d <- as.integer(m[4])
  
  distMatrix[c1,c2] <- d
  distMatrix[c2,c1] <- d
}

# This retrieves the length of a path
get_length <- function(vec) {
  n <- 1
  l <- length(vec) - 1
  d <- 0
  for (i in n:l) {
    d = d + distMatrix[vec[i], vec[i + 1]]
  }
  return(d)
}

# Get all paths
p <- gtools::permutations(8,8, citynames)

# Map them
lengths<- apply(p, 1, get_length)

# Part 1 & 2
print(min(lengths))
print(max(lengths))