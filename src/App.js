import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./index.css";
import { BowieAlbums, CaveAlbums } from "./components/Arrays";
import { listItems } from "./components/Questions";
function App() {
	const [counter, setCounter] = useState(0);
	const [items, updateItems] = useState(listItems);
	const [timeLeft, setTimeLeft] = useState(10);
	const [success, setSuccess] = useState(false);
	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const itemsArray = Array.from(items);
		const [reorderedItem] = itemsArray.splice(result.source.index, 1);
		itemsArray.splice(result.destination.index, 0, reorderedItem);

		updateItems(itemsArray);
		let resultArray = itemsArray.map(({ name }) => name);
		console.log("resultArray", resultArray);
		console.log("BowieAlbums", BowieAlbums);
		const x = resultArray.join();
		const y = BowieAlbums.join();

		if (x === y) {
			setCounter(counter + 1);
			setSuccess(true);
			console.log(success);
			console.log("counter", counter);
		}
	}

	useEffect(() => {
		if (!timeLeft) return;
		const intervalId = setInterval(() => {
			setTimeLeft(timeLeft - 1);
		}, 1000);
		console.log(timeLeft);

		return () => clearInterval(intervalId);
	}, [timeLeft]);

	return (
		<div className="App">
			<h1>Points: {counter}</h1>
			{success === false ? (
				<h1>Time Left: {timeLeft}</h1>
			) : (
				<h1>Success</h1>
			)}

			{timeLeft < 1 && success === false && <h1>Oh No!</h1>}

			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="items">
					{(provided) => (
						<ul
							className="items"
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{items.map(({ id, name, thumb }, index) => {
								return (
									<Draggable
										key={id}
										draggableId={id}
										index={index}
									>
										{(provided) => (
											<li
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<div className="items-thumb">
													<img
														src={thumb}
														alt={`${name} Thumb`}
													/>
												</div>

												<p>{name}</p>
											</li>
										)}
									</Draggable>
								);
							})}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
}

export default App;
