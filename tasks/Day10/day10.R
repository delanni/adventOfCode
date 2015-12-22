# Start with the input
input <- "1113122113"

# Create the function to say something out, with regexp matches
say_out <- function(str){
  matches <- gregexpr("(\\d)\\1*", str)
  matches <- regmatches(str, matches)[[1]]
  said <- sapply(matches, function(e){
    as.character(length(e))
    return(paste(as.character(nchar(e)),substr(e,1,1), sep = ""))
  });
  return(paste(said, collapse = ""))
}

# Do the macarena
output <- input
for(i in 1:40){
  output <- say_out(output)
}

n<-nchar(output)
print(n)

# Dont do this, R is damn slow! :(
output <- input
for(i in 1:50){
  output <- say_out(output)
}

n<- nchar(output)
print(n)