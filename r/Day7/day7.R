# I'm too dumb to use a graph, or the graphs on the R market are not really for my taste, so I'll use a dumb list-referencing to emulate graphs

input <- readLines("input.txt")

instructions = list()
cache = list()

for (line in input) {
  parts <- strsplit(line, "\\s->\\s")[[1]]
  operation <- strsplit(parts[1], " ")[[1]]
  names(operation) <- switch (length(operation),
                              c("in1"),
                              c("op", "in1"),
                              c("in1","op","in2"))
  output <- parts[2]
  instructions[[output]] <- operation
}

# Ugly iterative-ish code, but at least it works
resolve <- function(var) {
  if (!is.null(cache[[var]])) {
    return(cache[[var]]);
  } else {
    parsed <- as.integer(var)
    if (is.na(parsed)) {
      operation <- instructions[[var]]
      n <- switch(length(operation),
                  resolve(operation[1]),
                  bitwAnd(bitwNot(resolve(operation[2])), 0xffff),
                  switch(operation[2],
                         AND = bitwAnd(resolve(operation[1]),resolve(operation[3])),
                         OR = bitwOr(resolve(operation[1]), resolve(operation[3])),
                         RSHIFT = bitwShiftR(resolve(operation[1]), resolve(operation[3])),
                         LSHIFT = bitwShiftL(resolve(operation[1]), resolve(operation[3]))
                         )
                  )
    } else {
      n <- parsed
    }
    # Use the <<- operator to access global objects - without memoization it's never finishing
    cache[[var]] <<- n
    return(n)
  }
  
}

x <- resolve("a")
print(x)

cache = list()
cache[["b"]] <- x

x <- resolve("a")

print(x)
