class Employee < ApplicationRecord
    connects_to database: { writing: :direct, reading: :direct_replica }
end
