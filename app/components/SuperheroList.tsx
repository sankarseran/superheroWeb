"use client";

import { useState, useEffect, useCallback } from "react";
import SuperheroCard from "./SuperheroCard";
import SuperheroFormModal from "./SuperheroFormModal";
import { Button, Input, notification } from "antd";
import Image from "next/image";
import { apiURL } from "../util";
import Loading from "../../public/loading.svg";

interface Superhero {
  humilityRating: number;
  id?: string;
  name: string;
  powers: { id: string; name: string }[];
}

const SuperheroList = () => {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [filteredSuperheroes, setFilteredSuperheroes] = useState<Superhero[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSuperhero, setSelectedSuperhero] = useState<Superhero | null>(
    null
  );
  const [api, contextHolder] = notification.useNotification();

  const fetchSuperheroes = useCallback(async () => {
    try {
      const response = await fetch(`${apiURL}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSuperheroes(data);
      setFilteredSuperheroes(data);
    } catch (error) {
      console.error("Error fetching superheroes:", error);
      api.error({
        message: "Error",
        description: "Failed to fetch superheroes. Please try again later.",
        showProgress: true,
        pauseOnHover: true,
      });
    }
  }, [api]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchSuperheroes().then(() => setLoading(false));
    }
  }, [fetchSuperheroes]);

  const showModal = (superhero: Superhero | null = null) => {
    // setSelectedSuperhero(superhero);
    // setIsModalVisible(true);
    console.log(superhero);
    if (superhero) {
      api.info({
        message: "Info",
        description: "Coming Soon!",
        showProgress: true,
      });
      return;
    }

    setIsModalVisible(true);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
    setFilteredSuperheroes(
      superheroes.filter((hero) => hero.name.toLowerCase().includes(query))
    );
  };

  const handleModalClose = (dataUpdated: boolean) => {
    setIsModalVisible(false);
    setSelectedSuperhero(null);
    if (dataUpdated) {
      fetchSuperheroes(); // Refresh the list only if data was updated
    }
  };

  return (
    <>
      {contextHolder}
      <div className="container mx-auto p-4">
        {/* Fixed Header and Button */}
        <div className="fixed top-14 left-0 right-0 p-4">
          <div className="flex justify-between items-center z-50">
            <Input
              placeholder="Search superheroes..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-1/2 p-2 border rounded"
            />
            <Button
              type="primary"
              className="bg-gray-900 !!hover:bg-[gray-800]"
              onClick={() => showModal()}
            >
              Add Superhero
            </Button>
          </div>
        </div>
        {loading && (
            <div className="flex items-center justify-center h-2/4">
              <Image src={Loading} alt="Logo" width={150} height={150} />
            </div>
          )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSuperheroes.map((superhero) => (
            <SuperheroCard
              key={superhero.id}
              superhero={superhero}
              onEdit={showModal}
            />
          ))}
        </div>
        <SuperheroFormModal
          visible={isModalVisible}
          onClose={handleModalClose}
          superhero={selectedSuperhero}
        />
      </div>
    </>
  );
};

export default SuperheroList;
