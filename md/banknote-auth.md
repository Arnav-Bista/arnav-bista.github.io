# BankNote Authentication

- [BankNote Authentication](#banknote-authentication)
  - [Dataset Description](#dataset-description)
  - [Model Details](#model-details)
  - [Code](#code)

## Dataset Description

The [BankNote Authentication](https://archive.ics.uci.edu/ml/datasets/banknote+authentication) is a multivariate classification model that utilises simple logistic regression.

The dataset consists of 5 attributes:

1. Variance of Wavelet Transformed image (continuous)
2. Skewness of Wavelet Transformed image (continuous)
3. Curtosis of Wavelet Transformed image (continuous)
4. Entropy of image (continuous)
5. Class (integer)

Attributes 1 to 4 will be our input and the 5th attribute will be the output.  

## Model Details

- `Cost/Loss Function` &rarr; `Log Loss`
- `Activation Function` &rarr; `Sigmoid`
- `Optimizer` &rarr; `Batch Gradient Descent`

## Code

```julia
using Plots
using CSV
using Tables
using Random


function load(path = "data_banknote_authentication.csv", shuf = false)
    a = CSV.File(path) |> Tables.matrix
    if shuf
        a = a[shuffle(1:end),:]
    end
    m, p = size(a)
    X = fill(1.0,m,p)
    X[:,2:p] = a[:,1:4]
    Y = a[:,5]
    return X,Y
end

# Actvation Function
function sigmoid(Z)
    return 1/(1 + exp(-Z))
end

# Cost Function
function LogLoss(theta)
    global X,Y
    m = size(Y)[1]
    h = sigmoid.(X*theta)
    return  (-1 / m) * sum((Y .* log10.(h)) .+ ((1 .- Y) .* log10.(1 .- h)))
end

# Optimizer - Batch Gradient Descent
function BGD(x,y,theta)
    m = size(y,1)
    a = 0.001 # Step Size
    iterations = 10000
    J = [0.0 for i in 1:iterations]
    for i in 1:iterations
        h = sigmoid.(x * theta)
        theta = theta + a/m * transpose(x) * (y .- h)
        J[i] = LogLoss(theta)
    end
    return theta,J
end

function Test(X,Y,theta)
    h = sigmoid.(X*theta)
    m = size(Y)[1]
    c = 0
    for i in 1:m
        if h[i] > 0.5
            h[i] = 1
        else
            h[i] = 0
        end
        if h[i] == Y[i]
            c = c + 1
        end
    end
    return round( c / m * 100, digits = 3) # % of what the model got correct
end

X,Y = load("data_banknote_authentication.csv")
# Initialize our parameters
# Usually we do random initialization
t = [0 for i in 1:size(X)[2]] 
println("Initial Costs: ", LogLoss(t))
theta , J = BGD(X,Y,t) # Train the model
println(Test(X,Y,theta)) # Test the model
```
