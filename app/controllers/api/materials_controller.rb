module Api
  class MaterialsController < ApiController
    def index
      materials = Material.all
      render_success(materials.select(:id, :name))
    end
  end
end