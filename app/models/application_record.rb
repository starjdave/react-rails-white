class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  connects_to database: { writing: :direct, reading: :direct_replica }
end
