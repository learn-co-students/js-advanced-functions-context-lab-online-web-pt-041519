arr = [1,2,3,4,5,6,7]

# Ruby SELECT equals JS FILTER
# Select even els of arr (Ruby fns are defined as a block --- Ruby block fns are like JS fns!)
new_arr = arr.select do |el|
    el.even? # el % 2 == 0
end
puts  new_arr

# Same goal, written JS style (Ruby select is just like JS filter method!)
class Array
    def filter(fn) # fn is the lambda fn defined below
        new_arr = [] 
        for el in self
            if fn[el] # lambda fn below (if el % 2 == 0, aka even!)
                new_arr << el
            end
        end
        new_arr 
    end
end

filtered_arr = arr.filter( ->(el){el % 2 == 0}) # Lambda fn is similar to JS arrow fn
puts filtered_arr


# Ruby MAP equals JS MAP
mapped_arr = arr.map{|el| el * 2}
puts mapped_arr.to_s # to_s puts return value in [], just easier to read!