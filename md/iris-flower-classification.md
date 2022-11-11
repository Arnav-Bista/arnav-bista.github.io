# Iris Flower Classification

Github Link - <https://github.com/Arnav-Bista/IrisFlower-KNN>

## Dataset Description

The [Iris Flower Dataset](https://archive.ics.uci.edu/ml/datasets/iris) is a multivariate classification model that utilises the K Nearest Neighbours (KNN) algorithm.

The dataset consists of 5 attributes

1. Sepal length in cm (continuous)
2. Sepal width in cm (continuous)
3. Petal length in cm (continuous)
4. Petal width in cm (continuous)
5. Class (String)

Attributes 1 to 4 will be our features and the 5th attribute will be the output.

## KNN

Whilst KNN falls under supervised learning, the model does not really *"learn"* anything in particular but it instead simply memorises the training dataset.

KNN sticks to the philosophy of "birds of a feather flock together". Given an integer K, and a data point X, it will seek out the K nearest points from X. Then, whichever class is the most common in those K points is assigned to X. Hence, the name K Nearest Neighbours.

Simply put:

```nolanguage
KNN(X,K):
    Calculate the distances between X and the datset
    Find the K closest points about X
    Count the occurances of each class
    The class with the highest occurance is the prediction
end
```

## Code

(Available in GitHub)

```julia
using Tables
using CSV
using Random
# using PlotlyJS

#=
Load Data
The split parameter takes in an integer value between 0 and 100
It then splits the data into Training and Testing sets.
If split = 0 (i.e no values passed) then the program will return the whole dataset.
If split is supplied, the return will be TrainX,TrainY,TestX,TestY
=#
function load(split::Integer = 0, whole = false)
    # Usually the dataset contains 4 features and 1 class at the right hand supplied
    # Else, we'll have to edit the matrix splices manually
    # I've specified the type of matrix so It'll be easier to if things go wrong.
    # (You can't store NaN values in a Float64 matrix!)
    data = CSV.File("iris.csv") |> Tables.matrix
    if whole 
        return data
    end
    # Rows, Columns
    m = size(data,1)
    if split == 0
        X::Matrix{Float64} = data[:,1:4]
        Y::Vector{String} = data[:,5]
        return X,Y
    end
    # Shuffling Data - Very Important if data is split
    data = data[shuffle(1:end),:]
    m = trunc(Int, m * split / 100)
    TrainX::Matrix{Float64} = data[1:m,1:4]
    TrainY::Vector{String} = data[1:m,5]
    TestX::Matrix{Float64} = data[m+1:end,1:4]
    TestY::Vector{String} = data[m+1:end,5]
    return TrainX,TrainY,TestX,TestY
end


#= 
The Minkowski Distance function is the generalised form of 
the Euclidean and Manhattan distance metrics. 
p = 1 - Manhattan
p = 2 - Euclidean
=#
function minkowski_distance(A::Vector{Float64},B::Vector{Any},p::Number)
    return sum(abs.(A .- B)) ^ (1/p)
end

# Modified Bubble Sort
function bubblesort(toSort,toMatch)
    m = size(toSort,1)
    for i in 1:m
        for j in 1:(m-i-1)
            if toSort[j] > toSort[j+1]
                toSort[j], toSort[j+1] = toSort[j+1], toSort[j]
                toMatch[j,:], toMatch[j+1,:] = toMatch[j+1,:], toMatch[j,:]
            end
        end
    end
    return toSort,toMatch
end

# Main KNN Function
function KNN(dataEntry::Vector{Float64}, dataSet::Matrix{Any}, K::Integer)
    distances = [0.0 for i in 1:size(dataSet,1)]
    for i in 1:size(dataSet,1)
        distances[i] = minkowski_distance(dataEntry,dataSet[i,1:4],2)
    end
    # Get the K Nearest Neighbours
    bubblesort(distances,dataSet)
    knn::Vector{Any} = dataSet[1:K,end]
    # Make a Set of the classes
    output = [[0,i] for i in Set(knn[:,end])]
    # Count occurances
    for i in eachindex(output)
        # class isn't a keyword in Julia :D
        for class in knn
            if class == output[i][2]
                output[i][1] += 1
            end
        end
    end
    # Get max occurances
    max, index = -1, 1
    for i in eachindex(output)
        if max < output[i][1]
            max = output[i][1]
            index = i
        end
    end
    return output[index][2]
end

function Test(split, K)
    X,Y,TX,TY = load(split)
    dataSet = cat(X,Y,dims=2)
    correct = 0
    for i in eachindex(TY)
        # println(KNN(TX[i,:],dataSet,K), " ", TY[i])
        if KNN(TX[i,:],dataSet,K) == TY[i]
            correct += 1
        end
    end
    println(correct,"/",size(TY,1))
end


# Let's test our algorithm.
# 70:30 split with training and test data 
split = 70
# 3 Neighbours is usually the sweet number
K = 3
Test(split,K)n
```

## Conclusion

With the standard 70:30 Split in training and testing, I consistently get about 90% correctly classified with `K = 3`. Although this is a lazy algorithm, it's quite good at classifying.

Besides from classifications, it can also be used to fill in missing values from a dataset to then train a more sophisticated model.

This model does have its limitations. It works wonderfully in medium to small sized datasets, however, when datasets get large with tens of thousands of datapoints - each with their own tens or hundreds of features - it becomes obsolete.
